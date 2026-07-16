import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true, min: 0 },
    minPurchase: { type: Number, default: 0 },
    maxDiscount: { type: Number }, // caps a percentage discount, e.g. "20% off, up to $50"
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number, default: null }, // null = unlimited
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CouponSchema.methods.isValid = function (cartTotal) {
  if (!this.isActive) return { valid: false, reason: 'Coupon is not active' };
  if (this.expiresAt < new Date()) return { valid: false, reason: 'Coupon has expired' };
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
    return { valid: false, reason: 'Coupon usage limit reached' };
  }
  if (cartTotal < this.minPurchase) {
    return { valid: false, reason: `Minimum purchase of ${this.minPurchase} required` };
  }
  return { valid: true };
};

CouponSchema.methods.calculateDiscount = function (cartTotal) {
  let discount = this.discountType === 'percentage' ? (cartTotal * this.discountValue) / 100 : this.discountValue;
  if (this.maxDiscount) discount = Math.min(discount, this.maxDiscount);
  return Math.min(discount, cartTotal); // never discount more than the cart is worth
};

const Coupon = mongoose.model('Coupon', CouponSchema);
export default Coupon;
