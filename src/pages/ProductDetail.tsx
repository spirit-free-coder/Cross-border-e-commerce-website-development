import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, ShoppingCart, ArrowLeft, Camera, Send, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import { cn } from '../lib/utils';
import { ref, uploadBytes, getDownloadURL, storage } from '../firebase';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, favorites, toggleFavorite, addToCart, reviews, addReview } = useApp();
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState(user?.displayName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const product = PRODUCTS.find(p => p.id === Number(id));
  const productReviews = reviews.filter(r => r.productId === Number(id));

  if (!product) {
    return (
      <div className="pt-40 pb-32 px-6 text-center">
        <h2 className="text-3xl font-headline italic mb-6">Product Not Found</h2>
        <NavLink to="/shop" className="text-primary font-label text-sm uppercase tracking-widest border-b border-primary pb-1">Return to Shop</NavLink>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Update userName when user changes
  React.useEffect(() => {
    if (user?.displayName && !userName) {
      setUserName(user.displayName);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || !userName) return;
    
    setIsSubmitting(true);
    try {
      let imageUrl = '';
      if (selectedFile) {
        const fileRef = ref(storage, `reviews/${Date.now()}_${selectedFile.name}`);
        await uploadBytes(fileRef, selectedFile);
        imageUrl = await getDownloadURL(fileRef);
      }

      await addReview({
        productId: product!.id,
        userName,
        rating,
        comment,
        image: imageUrl || undefined
      });

      setComment('');
      setUserName(user?.displayName || '');
      setRating(5);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = productReviews.length > 0 
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
    : 'New';

  return (
    <div className="pt-32 pb-32 px-6 max-w-screen-xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-label text-sm font-bold"
          >
            <Check size={18} />
            Added to Sanctuary Collection
          </motion.div>
        )}
      </AnimatePresence>

      <NavLink to="/shop" className="inline-flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors mb-12 font-label text-xs uppercase tracking-widest font-bold">
        <ArrowLeft size={16} />
        Back to Collection
      </NavLink>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/5] bg-surface-container-high rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/20 to-transparent"></div>
          <button 
            onClick={() => toggleFavorite(product.id)}
            className={cn(
              "absolute top-8 right-8 p-4 rounded-full shadow-xl backdrop-blur-md transition-all",
              favorites.includes(product.id) ? "bg-tertiary text-white" : "bg-white/90 text-on-surface hover:bg-tertiary hover:text-white"
            )}
          >
            <Heart size={24} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
          </button>
        </motion.div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-primary font-label text-sm uppercase tracking-[0.3em] font-bold mb-6">{product.material}</p>
          <h1 className="text-5xl md:text-6xl font-headline italic text-on-surface mb-6 leading-tight tracking-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-tertiary">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill={s <= Math.round(Number(averageRating)) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-on-surface-variant font-label text-sm">({productReviews.length} Reviews)</span>
          </div>

          <p className="text-3xl font-headline italic text-on-surface mb-10">${product.price}</p>
          
          <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-12 opacity-80">
            A masterpiece of quiet reverence, designed to honor the unique spirit of your companion. Each piece is individually crafted with the utmost care and attention to detail, ensuring a dignified and beautiful memorial that will stand the test of time.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
            >
              <ShoppingCart size={20} />
              Add to Sanctuary
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="border-t border-outline-variant/10 pt-16">
        <div className="flex gap-12 mb-16 border-b border-outline-variant/5">
          <button 
            onClick={() => setActiveTab('description')}
            className={cn(
              "pb-6 font-label text-sm uppercase tracking-widest font-bold transition-all relative",
              activeTab === 'description' ? "text-primary" : "text-on-surface-variant/40 hover:text-on-surface-variant"
            )}
          >
            Details & Care
            {activeTab === 'description' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-primary" />}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={cn(
              "pb-6 font-label text-sm uppercase tracking-widest font-bold transition-all relative",
              activeTab === 'reviews' ? "text-primary" : "text-on-surface-variant/40 hover:text-on-surface-variant"
            )}
          >
            Tributes ({productReviews.length})
            {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-primary" />}
          </button>
        </div>

        <div className="max-w-4xl">
          {activeTab === 'description' ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-headline italic mb-6">Craftsmanship</h3>
                  <p className="text-on-surface-variant leading-relaxed font-body">
                    Our artisans use traditional techniques passed down through generations. The {product.material.toLowerCase()} is selected for its purity and strength, then hand-finished to achieve a texture that is both comforting and resilient.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-headline italic mb-6">Specifications</h3>
                  <ul className="space-y-4 text-on-surface-variant font-body text-sm">
                    <li className="flex justify-between border-b border-outline-variant/5 pb-2">
                      <span>Material</span>
                      <span className="text-on-surface font-medium">{product.material}</span>
                    </li>
                    <li className="flex justify-between border-b border-outline-variant/5 pb-2">
                      <span>Dimensions</span>
                      <span className="text-on-surface font-medium">8" x 8" x 10"</span>
                    </li>
                    <li className="flex justify-between border-b border-outline-variant/5 pb-2">
                      <span>Capacity</span>
                      <span className="text-on-surface font-medium">200 cubic inches</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Review Form */}
              <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant/10">
                <h3 className="text-3xl font-headline italic mb-8">Share Your Tribute</h3>
                <form onSubmit={handleSubmitReview} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Your Name</label>
                      <input 
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="How should we address you?"
                        className="w-full bg-white border border-outline-variant/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none font-body transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Rating</label>
                      <div className="flex gap-2 py-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button 
                            key={s} 
                            type="button"
                            onClick={() => setRating(s)}
                            className={cn(
                              "transition-all",
                              s <= rating ? "text-tertiary" : "text-on-surface-variant/20"
                            )}
                          >
                            <Star size={24} fill={s <= rating ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Your Message</label>
                    <textarea 
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts or a memory..."
                      className="w-full bg-white border border-outline-variant/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none font-body transition-all resize-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-4 w-full sm:w-auto">
                      <input 
                        type="file" 
                        id="photo-upload" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      <label 
                        htmlFor="photo-upload"
                        className="flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors font-label text-xs uppercase tracking-widest font-bold cursor-pointer"
                      >
                        <Camera size={18} />
                        {selectedFile ? 'Change Photo' : 'Upload a Photo'}
                      </label>
                      
                      {previewUrl && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-outline-variant/20">
                          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={removeFile}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-on-surface text-surface px-12 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : (
                        <>
                          Post Tribute
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-12">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-outline-variant/5 pb-12"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-headline italic mb-1">{review.userName}</h4>
                          <p className="text-xs text-on-surface-variant/60 font-label uppercase tracking-widest">{review.date}</p>
                        </div>
                        <div className="flex text-tertiary">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} fill={s <= review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-on-surface-variant font-body leading-relaxed italic opacity-80 mb-4">
                        "{review.comment}"
                      </p>
                      {review.image && (
                        <div className="w-full max-w-md rounded-2xl overflow-hidden mb-4">
                          <img src={review.image} alt="Review attachment" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-on-surface-variant italic font-body">No tributes yet. Be the first to share your experience.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
