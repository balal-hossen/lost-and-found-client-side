import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      comment: "Great service and fast delivery!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      comment: "Very satisfied with the product quality.",
      rating: 4,
    },
    {
      id: 3,
      name: "Alice Johnson",
      comment: "Customer support was very helpful.",
      rating: 5,
    },
  ];

  return (
    <section className="container mx-auto px-4 my-12">
      <h2 className="text-3xl font-bold mb-6 text-black text-center">Customer Reviews</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(({ id, name, comment, rating }) => (
          <div key={id} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-700 mb-4">"{comment}"</p>
            <p className="font-semibold text-gray-400">{name}</p>
            <p className="text-yellow-500">
              {"★".repeat(rating)}{"☆".repeat(5 - rating)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
