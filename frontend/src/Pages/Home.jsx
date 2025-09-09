import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Edit, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Streamline Your <span className="text-blue-600">Product Workflow</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            A simple, elegant, and powerful solution to manage your product inventory. Add, edit, sort, and search with ease.
          </p>
          <div className="mt-8">
            <Link to="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                Go to Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Core Features</h2>
            <p className="mt-2 text-md text-gray-600">Everything you need in a modern product manager.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Package className="w-6 h-6 text-blue-600" />}
              title="Add & View Products"
              description="Easily add new products to your inventory and view them in a clean, organized grid."
            />
            <FeatureCard
              icon={<Edit className="w-6 h-6 text-blue-600" />}
              title="Edit & Update"
              description="Quickly update product details like name, price, and description with our intuitive form."
            />
            <FeatureCard
              icon={<Trash2 className="w-6 h-6 text-blue-600" />}
              title="Delete Securely"
              description="Remove products from your list with a confirmation step to prevent accidental deletions."
            />
          </div>
        </div>
      </div>
    </div>
  );
}