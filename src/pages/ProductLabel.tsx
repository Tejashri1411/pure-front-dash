import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';

const ProductLabel: React.FC = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WINE {product.vintage || ''}</h1>
          <h2 className="text-2xl text-gray-700 mb-2">{product.name?.toLowerCase() || ''}</h2>
          <p className="text-lg text-gray-600">{product.appellation || ''}</p>
        </div>

        {/* Wine Details */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-6 text-sm text-gray-700">
            <span>{product.type || ''}</span>
            <span>{product.sugarContent || ''}</span>
            <span>{product.netVolume || ''}</span>
            <span>{product.alcohol || ''}</span>
          </div>
        </div>

        {/* Nutrition Declaration */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Declaration</h3>
          <div className="text-right mb-2">
            <span className="text-sm text-gray-600">Nutritions per 100 ml</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">Energy</span>
              <div className="text-right">
                <div>0 kJ</div>
                <div>0 kcal</div>
              </div>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">Fat</span>
              <span>0 g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-2 pl-4">
              <span className="italic">of which Saturates</span>
              <span>0 g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">Carbohydrate</span>
              <span>0 g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-2 pl-4">
              <span className="italic">of which Sugars</span>
              <span>0 g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">Protein</span>
              <span>0 g</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Salt</span>
              <span>0 g</span>
            </div>
          </div>
        </div>

        {/* Responsible Consumption */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Responsible Consumption</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center justify-center w-16 h-16 border-2 border-red-500 rounded-full">
              <span className="text-red-500 font-bold text-lg">18</span>
            </div>
            <div className="flex items-center justify-center w-16 h-16 border-2 border-red-500 rounded-full">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications</h3>
          <div className="flex justify-center space-x-8">
            <div className="w-16 h-16 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">BIO</span>
            </div>
            <div className="w-16 h-16 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">VEGAN</span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p><strong>Producer:</strong> {product.brand || ''}</p>
          <p><strong>Country:</strong> {product.country || ''}</p>
          <p><strong>SKU:</strong> {product.sku || ''}</p>
          <p><strong>EAN:</strong> {product.ean || ''}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductLabel;
