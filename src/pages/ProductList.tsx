
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Navigation from '../components/Navigation';
import ProductPreviewDialog from '../components/ProductPreviewDialog';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import { Plus, Search, Download, Upload, MoreHorizontal, FileText, QrCode, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewProduct, setPreviewProduct] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: products = [], isLoading, error } = useProducts();
  const deleteProductMutation = useDeleteProduct();

  const filteredProducts = products.filter((product: any) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteProductMutation.mutate(id);
  };

  const handleDetails = (id: string) => {
    navigate(`/products/details/${id}`);
  };

  const handleDuplicate = (product: any) => {
    navigate('/products/create', { 
      state: { 
        duplicateFrom: {
          ...product,
          name: `${product.name} (Copy)`,
          sku: `${product.sku}-COPY`
        }
      }
    });
  };

  const handlePreview = (product: any) => {
    setPreviewProduct(product);
  };

  const handleGenerateQR = (id: string) => {
    const qrUrl = `${window.location.origin}/l/${id}`;
    navigator.clipboard.writeText(qrUrl);
    toast({
      title: "QR URL copied",
      description: "The product label URL has been copied to clipboard",
    });
  };

  const handleImport = () => {
    navigate('/products/import');
  };

  const handleExport = () => {
    import('xlsx').then((XLSX) => {
      const worksheet = XLSX.utils.json_to_sheet(products.map((product: any) => ({
        Name: product.name,
        Brand: product.brand,
        SKU: product.sku,
        EAN: product.ean,
        'Net Volume': product.netVolume,
        Alcohol: product.alcohol,
        Vintage: product.vintage,
        Type: product.type,
        'Sugar Content': product.sugarContent,
        Country: product.country,
        Appellation: product.appellation
      })));
      
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
      
      XLSX.writeFile(workbook, 'products.xlsx');
      
      toast({
        title: "Export successful",
        description: "Products exported to Excel file",
      });
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">
            Error loading products: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your wine products and generate labels</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-2">
                <Button 
                  onClick={() => navigate('/products/create')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
                <Button variant="outline" onClick={handleImport}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Alcohol</TableHead>
                  <TableHead>Vintage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product: any) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.alcohol}</TableCell>
                    <TableCell>{product.vintage}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreview(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product.id)}
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateQR(product.id)}
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDetails(product.id)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)}>
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(product)}>
                              Duplicate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <ProductPreviewDialog
        product={previewProduct}
        open={!!previewProduct}
        onClose={() => setPreviewProduct(null)}
      />
    </div>
  );
};

export default ProductList;
