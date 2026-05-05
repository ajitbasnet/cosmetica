'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingBag, Heart } from 'lucide-react'
import TransitionLink from '@/components/ui/TransitionLink'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'relative' }}
    >
      <TransitionLink href={`/products/${product.categorySlug}/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#f5f2ec', aspectRatio: '1' }}>
          <motion.img
            src={product.img}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7 }}
          />
          {/* Badge */}
          {product.badge && (
            <div style={{
              position: 'absolute', top: 14, left: 14,
              background: '#0a0a0a', color: '#fafaf8',
              fontFamily: 'Montserrat, sans-serif', fontSize: 8, fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 10px',
            }}>
              {product.badge}
            </div>
          )}
          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); setWished(w => !w) }}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(250,250,248,0.9)', border: 'none',
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <Heart size={13} fill={wished ? '#0a0a0a' : 'none'} color="#0a0a0a" />
          </button>
          {/* Quick add hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '12px',
            }}
          >
            <button onClick={handleAdd}
              style={{
                width: '100%', padding: '11px',
                background: added ? '#22c55e' : '#0a0a0a', color: '#fafaf8',
                border: 'none', cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.3s',
              }}
            >
              <ShoppingBag size={11} />
              {added ? 'Added!' : 'Quick Add'}
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 0 0' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 6 }}>
            {product.brand}
          </p>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, color: '#0a0a0a', marginBottom: 8, lineHeight: 1.25 }}>
            {product.name}
          </h3>
          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={10} fill={s <= Math.round(product.rating) ? '#0a0a0a' : 'none'} color="#0a0a0a" />
              ))}
            </div>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, color: '#9b9b9b' }}>({product.reviews})</span>
          </div>
          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: '#0a0a0a' }}>
              NPR {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#9b9b9b', textDecoration: 'line-through' }}>
                NPR {product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  )
}
