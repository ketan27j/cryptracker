import React, { useState } from 'react';

const IndexingForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    nftAddress: '',
    nftPrice: '',
    tokenToBorrow: '',
    tokenPrice: '',
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', { selectedCategory, ...formData });
    // TODO: Add logic to handle form submission
  };

  return (
    <div>
      <div className="rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Select Indexing Category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="nftBids">Currently available bids on an NFT</option>
              <option value="nftPrices">Current prices of an NFT</option>
              <option value="tokensToBorrow">Currently available tokens to borrow</option>
              <option value="tokenPrices">Current price of a specific token on various platforms</option>
            </select>
          </div>

          {selectedCategory === 'nftBids' && (
            <div>
              <label htmlFor="nftAddress" className="block text-sm font-medium text-gray-700">
                NFT Address
              </label>
              <input
                id="nftAddress"
                name="nftAddress"
                type="text"
                value={formData.nftAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                required
              />
            </div>
          )}

          {selectedCategory === 'nftPrices' && (
            <div>
              <label htmlFor="nftPrice" className="block text-sm font-medium text-gray-700">
                NFT Price
              </label>
              <input
                id="nftPrice"
                name="nftPrice"
                type="text"
                value={formData.nftPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                required
              />
            </div>
          )}

          {selectedCategory === 'tokensToBorrow' && (
            <div>
              <label htmlFor="tokenToBorrow" className="block text-sm font-medium text-gray-700">
                Token to Borrow
              </label>
              <input
                id="tokenToBorrow"
                name="tokenToBorrow"
                type="text"
                value={formData.tokenToBorrow}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                required
              />
            </div>
          )}

          {selectedCategory === 'tokenPrices' && (
            <div>
              <label htmlFor="tokenPrice" className="block text-sm font-medium text-gray-700">
                Token Price
              </label>
              <input
                id="tokenPrice"
                name="tokenPrice"
                type="text"
                value={formData.tokenPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                required
              />
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexingForm;
