import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  query, 
  where, 
  deleteDoc, 
  addDoc, 
  Timestamp,
  User,
  OperationType,
  handleFirestoreError
} from '../firebase';
import { PRODUCTS } from '../constants';

interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: string;
  productId: number;
  userName: string;
  userUid: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: string;
  total: number;
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

interface AppContextType {
  user: User | null;
  profile: any | null;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  cartCount: number;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  orders: Order[];
  checkout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  isAuthReady: boolean;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      setLoading(false);
      
      if (currentUser) {
        // Create user profile if it doesn't exist
        const userRef = doc(db, 'users', currentUser.uid);
        setDoc(userRef, {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          createdAt: Timestamp.now()
        }, { merge: true }).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`));
      } else {
        // Clear local state when logged out
        setProfile(null);
        setFavorites([]);
        setCartItems([]);
        setOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Profile
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setProfile(doc.data());
      }
    }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}`));
    return () => unsubscribe();
  }, [user]);

  // Sync Orders
  useEffect(() => {
    if (!user) return;
    const ordersRef = collection(db, 'users', user.uid, 'orders');
    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      setOrders(ordersData);
    }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}/orders`));
    return () => unsubscribe();
  }, [user]);

  // Sync Favorites
  useEffect(() => {
    if (!user) return;
    const favsRef = collection(db, 'users', user.uid, 'favorites');
    const unsubscribe = onSnapshot(favsRef, (snapshot) => {
      const favIds = snapshot.docs.map(doc => Number(doc.id));
      setFavorites(favIds);
    }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}/favorites`));
    return () => unsubscribe();
  }, [user]);

  // Sync Cart
  useEffect(() => {
    if (!user) return;
    const cartRef = collection(db, 'users', user.uid, 'cart');
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        const product = PRODUCTS.find(p => p.id === Number(doc.id));
        return product ? { ...product, quantity: data.quantity } : null;
      }).filter(Boolean) as CartItem[];
      setCartItems(items);
    }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}/cart`));
    return () => unsubscribe();
  }, [user]);

  // Sync Reviews
  useEffect(() => {
    const reviewsRef = collection(db, 'reviews');
    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const revs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(revs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, (err) => handleFirestoreError(err, OperationType.GET, 'reviews'));
    return () => unsubscribe();
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleFavorite = async (id: number) => {
    if (!user) return;
    const favRef = doc(db, 'users', user.uid, 'favorites', id.toString());
    if (favorites.includes(id)) {
      await deleteDoc(favRef).catch(err => handleFirestoreError(err, OperationType.DELETE, favRef.path));
    } else {
      await setDoc(favRef, {
        productId: id,
        addedAt: Timestamp.now()
      }).catch(err => handleFirestoreError(err, OperationType.WRITE, favRef.path));
    }
  };

  const addToCart = async (product: Product) => {
    if (!user) return;
    const cartItemRef = doc(db, 'users', user.uid, 'cart', product.id.toString());
    const existing = cartItems.find(item => item.id === product.id);
    
    await setDoc(cartItemRef, {
      productId: product.id,
      quantity: existing ? existing.quantity + 1 : 1,
      addedAt: Timestamp.now()
    }, { merge: true }).catch(err => handleFirestoreError(err, OperationType.WRITE, cartItemRef.path));
  };

  const removeFromCart = async (id: number) => {
    if (!user) return;
    const cartItemRef = doc(db, 'users', user.uid, 'cart', id.toString());
    await deleteDoc(cartItemRef).catch(err => handleFirestoreError(err, OperationType.DELETE, cartItemRef.path));
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (!user) return;
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    const cartItemRef = doc(db, 'users', user.uid, 'cart', id.toString());
    await setDoc(cartItemRef, { quantity }, { merge: true }).catch(err => handleFirestoreError(err, OperationType.WRITE, cartItemRef.path));
  };

  const addReview = async (review: Omit<Review, 'id' | 'date'>) => {
    if (!user) return;
    const reviewsRef = collection(db, 'reviews');
    await addDoc(reviewsRef, {
      ...review,
      userUid: user.uid,
      date: new Date().toISOString().split('T')[0]
    }).catch(err => handleFirestoreError(err, OperationType.CREATE, 'reviews'));
  };

  const updateProfile = async (data: any) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, data, { merge: true }).catch(err => handleFirestoreError(err, OperationType.WRITE, userRef.path));
  };

  const checkout = async () => {
    if (!user || cartItems.length === 0) return;
    
    const ordersRef = collection(db, 'users', user.uid, 'orders');
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const newOrder = {
      userId: user.uid,
      date: new Date().toISOString(),
      status: 'Pending',
      total,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    await addDoc(ordersRef, newOrder).catch(err => handleFirestoreError(err, OperationType.CREATE, ordersRef.path));
    
    // Clear cart
    for (const item of cartItems) {
      await deleteDoc(doc(db, 'users', user.uid, 'cart', item.productId.toString()))
        .catch(err => handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/cart/${item.productId}`));
    }
  };

  return (
    <AppContext.Provider value={{ 
      user,
      profile,
      favorites, 
      toggleFavorite, 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      cartCount, 
      reviews,
      addReview,
      orders,
      checkout,
      updateProfile,
      isAuthReady,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
