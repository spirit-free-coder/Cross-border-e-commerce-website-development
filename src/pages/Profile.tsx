import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User as UserIcon, Package, Heart, Settings, LogOut, ChevronRight, Edit2, MapPin, CreditCard, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import { logout } from '../firebase';

export function Profile() {
  const { user, profile, favorites, toggleFavorite, addToCart, updateProfile, orders } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: profile?.displayName || user?.displayName || 'Valued Member',
    email: profile?.email || user?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    avatar: profile?.photoURL || user?.photoURL || 'https://picsum.photos/seed/eleanor/200/200'
  });

  // Update local state when profile changes in context
  React.useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.displayName || user?.displayName || 'Valued Member',
        email: profile.email || user?.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        avatar: profile.photoURL || user?.photoURL || 'https://picsum.photos/seed/eleanor/200/200'
      });
    }
  }, [profile, user]);

  const wishlistItems = PRODUCTS.filter(p => favorites.includes(p.id));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        displayName: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        photoURL: profileData.avatar
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 max-w-screen-xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <div className="bg-surface-container rounded-3xl p-8 sticky top-32 border border-outline-variant/10 shadow-sm">
            <div className="flex flex-col items-center mb-10">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary/10">
                <img src={profileData.avatar} alt={profileData.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-headline italic text-on-surface">{profileData.name}</h3>
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mt-1">Member since 2024</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'My Profile', icon: UserIcon },
                { id: 'orders', label: 'Order History', icon: Package },
                { id: 'wishlist', label: 'My Wishlist', icon: Heart },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-label text-sm tracking-wide transition-all duration-300",
                    activeTab === item.id 
                      ? "bg-primary text-white shadow-md" 
                      : "text-on-surface-variant hover:bg-primary-container/30 hover:text-primary"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-label text-sm tracking-wide text-tertiary hover:bg-tertiary/5 transition-all mt-8"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-outline-variant/10 shadow-sm min-h-[600px]"
          >
            {activeTab === 'profile' && (
              <div className="space-y-10">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-6">
                  <h2 className="text-3xl font-headline italic text-on-surface">Personal Information</h2>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-primary font-label text-sm font-bold hover:opacity-80 transition-opacity"
                    >
                      <Edit2 size={16} />
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-surface-container border-none focus:ring-2 focus:ring-primary/20 font-body text-on-surface"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">Email Address</label>
                      <input 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-surface-container border-none focus:ring-2 focus:ring-primary/20 font-body text-on-surface"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">Phone Number</label>
                      <input 
                        type="tel" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-surface-container border-none focus:ring-2 focus:ring-primary/20 font-body text-on-surface"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">Shipping Address</label>
                      <textarea 
                        value={profileData.address} 
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-surface-container border-none focus:ring-2 focus:ring-primary/20 font-body text-on-surface min-h-[100px]"
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-4 pt-4">
                      <button type="submit" className="bg-primary text-white px-10 py-4 rounded-xl font-label text-sm font-bold shadow-md hover:bg-primary-dim transition-colors">Save Changes</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="bg-surface-container text-on-surface-variant px-10 py-4 rounded-xl font-label text-sm font-bold hover:bg-outline-variant/10 transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl text-primary"><UserIcon size={20} /></div>
                        <div>
                          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Full Name</p>
                          <p className="font-body text-on-surface font-medium">{profileData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl text-primary"><Bell size={20} /></div>
                        <div>
                          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Email Address</p>
                          <p className="font-body text-on-surface font-medium">{profileData.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl text-primary"><CreditCard size={20} /></div>
                        <div>
                          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Phone Number</p>
                          <p className="font-body text-on-surface font-medium">{profileData.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl text-primary"><MapPin size={20} /></div>
                        <div>
                          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Shipping Address</p>
                          <p className="font-body text-on-surface font-medium leading-relaxed">{profileData.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-8">
                <div className="border-b border-outline-variant/10 pb-6">
                  <h2 className="text-3xl font-headline italic text-on-surface">Order History</h2>
                </div>
                <div className="space-y-6">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                          <div>
                            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Order ID</p>
                            <p className="font-body text-on-surface font-bold">{order.id.substring(0, 8).toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Date</p>
                            <p className="font-body text-on-surface">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Status</p>
                            <span className={cn(
                              "px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                              order.status === 'Delivered' ? "bg-primary/10 text-primary" : "bg-secondary-container/50 text-secondary"
                            )}>
                              {order.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60 mb-1">Total</p>
                            <p className="font-body text-on-surface font-bold text-lg">${order.total}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                          <div className="flex items-center gap-4">
                            <p className="font-body text-on-surface-variant text-sm italic">{order.items.map(i => i.name).join(', ')}</p>
                          </div>
                          <button className="flex items-center gap-2 text-primary font-label text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                            View Details
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <Package size={48} className="text-outline-variant/30 mb-4" />
                      <p className="font-body text-on-surface-variant italic">You haven't placed any orders yet.</p>
                      <NavLink to="/shop" className="mt-6 text-primary font-label text-xs uppercase tracking-widest font-bold border-b border-primary pb-1">Start Shopping</NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-8">
                <div className="border-b border-outline-variant/10 pb-6">
                  <h2 className="text-3xl font-headline italic text-on-surface">My Wishlist</h2>
                </div>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="group bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500">
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                          <button 
                            onClick={() => toggleFavorite(item.id)}
                            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-tertiary shadow-sm hover:bg-tertiary hover:text-white transition-all"
                          >
                            <Heart size={18} fill="currentColor" />
                          </button>
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-headline text-xl text-on-surface italic">{item.name}</h3>
                            <span className="font-label text-sm text-on-surface-variant">${item.price}</span>
                          </div>
                          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{item.material}</p>
                          <button 
                            onClick={() => addToCart()}
                            className="w-full mt-4 py-3 rounded-xl bg-primary text-white font-label text-[10px] uppercase tracking-widest font-bold hover:bg-primary-dim transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Heart size={48} className="text-outline-variant/30 mb-4" />
                    <p className="font-body text-on-surface-variant italic">Your wishlist is currently empty.</p>
                    <NavLink to="/shop" className="mt-6 text-primary font-label text-xs uppercase tracking-widest font-bold border-b border-primary pb-1">Explore the Shop</NavLink>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="border-b border-outline-variant/10 pb-6">
                  <h2 className="text-3xl font-headline italic text-on-surface">Account Settings</h2>
                </div>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h4 className="font-headline text-xl italic text-on-surface">Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Order updates', desc: 'Receive emails about your order status' },
                        { label: 'New arrivals', desc: 'Be the first to know about new collections' },
                        { label: 'Memorial reminders', desc: 'Gentle reminders for special anniversaries' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                          <div>
                            <p className="font-body text-on-surface font-medium">{item.label}</p>
                            <p className="text-xs text-on-surface-variant/60">{item.desc}</p>
                          </div>
                          <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-headline text-xl italic text-on-surface">Security</h4>
                    <button className="w-full flex items-center justify-between p-6 bg-surface-container rounded-2xl hover:bg-primary-container/20 transition-colors">
                      <span className="font-body text-on-surface font-medium">Change Password</span>
                      <ChevronRight size={18} className="text-on-surface-variant" />
                    </button>
                    <button className="w-full flex items-center justify-between p-6 bg-surface-container rounded-2xl hover:bg-primary-container/20 transition-colors">
                      <span className="font-body text-on-surface font-medium">Two-Factor Authentication</span>
                      <span className="text-xs font-label uppercase tracking-widest text-tertiary font-bold">Disabled</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
