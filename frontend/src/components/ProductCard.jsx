import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/Card';
import Button from './ui/Button';
import { Edit, Trash2, Package, DollarSign } from 'lucide-react';

const categoryColors = {
  Electronics: "bg-blue-100 text-blue-800",
  Clothing: "bg-purple-100 text-purple-800",
  Books: "bg-green-100 text-green-800",
  "Home & Garden": "bg-orange-100 text-orange-800",
  Sports: "bg-red-100 text-red-800",
  Beauty: "bg-pink-100 text-pink-800",
  Toys: "bg-yellow-100 text-yellow-800",
  Automotive: "bg-gray-100 text-gray-800",
  Other: "bg-indigo-100 text-indigo-800"
};

export default function ProductCard({ product, onEdit, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      await onDelete(product._id);
      setIsDeleting(false);
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[product.category]}`}>
              {product.category}
            </span>
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {product.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 pt-0">
        <div className="flex items-center gap-1 mb-3">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>
        </div>
        
        {product.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-gray-50">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
