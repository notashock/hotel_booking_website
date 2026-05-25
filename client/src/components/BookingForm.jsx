import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiTag, FiLoader } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../services/bookingService';
import { validatePromoCode } from '../services/promotionService';

const BookingForm = ({ roomId, price }) => {
  const { user } = useAuth();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffMs = new Date(checkOutDate) - new Date(checkInDate);
    const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const totalPrice = Math.max(0, price * nights - discount);

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setError('');
    try {
      const promo = await validatePromoCode(promoCode);
      setDiscount(promo.discount || promo.discountAmount || 0);
    } catch (err) {
      setError(err.message || 'Invalid promo code.');
      setDiscount(0);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nights <= 0) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const result = await createBooking({
        roomId,
        checkInDate,
        checkOutDate,
        promoCode: promoCode.trim() || null,
      });
      setSuccess(`Booking confirmed! Reservation #${result.reservationNumber || result.id}`);
      setCheckInDate('');
      setCheckOutDate('');
      setPromoCode('');
      setDiscount(0);
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Not logged in
  if (!user) {
    return (
      <div className="text-center py-4">
        <p className="text-slate-600 mb-3 font-medium">Please login to book this room</p>
        <Link
          to="/login"
          className="inline-block gradient-bg-primary text-white font-semibold px-6 py-2 rounded-xl text-sm hover:shadow-lg transition-smooth"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
          {success}
        </div>
      )}

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-1 text-xs font-semibold text-slate-600 mb-1.5">
            <FiCalendar className="w-3 h-3" />
            Check-in
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm transition-smooth"
          />
        </div>
        <div>
          <label className="flex items-center gap-1 text-xs font-semibold text-slate-600 mb-1.5">
            <FiCalendar className="w-3 h-3" />
            Check-out
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
            min={checkInDate || new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm transition-smooth"
          />
        </div>
      </div>

      {/* Promo Code */}
      <div>
        <label className="flex items-center gap-1 text-xs font-semibold text-slate-600 mb-1.5">
          <FiTag className="w-3 h-3" />
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm transition-smooth"
          />
          <button
            type="button"
            onClick={applyPromoCode}
            disabled={promoLoading}
            className="px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-lg text-sm hover:bg-indigo-100 transition-smooth disabled:opacity-50"
          >
            {promoLoading ? <FiLoader className="w-4 h-4 animate-spin" /> : 'Apply'}
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="bg-white rounded-lg p-3 border border-slate-200 text-sm space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>{nights} night{nights > 1 ? 's' : ''} × ₹{price?.toLocaleString('en-IN')}</span>
            <span>₹{(price * nights).toLocaleString('en-IN')}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Promo Discount</span>
              <span>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-900 font-bold pt-1.5 border-t border-slate-200">
            <span>Total</span>
            <span className="text-indigo-600">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || nights <= 0}
        className="w-full gradient-bg-primary text-white font-semibold py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-smooth text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          'Confirm Booking'
        )}
      </button>
    </form>
  );
};

export default BookingForm;