// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export type ItemType = "keycap" | "keyboard" | "product";

// interface ItemFormProps {
//   type: ItemType;
// }

// interface FormData {
//   name: string;
//   price: string;
//   image: string;
//   description: string;
//   brand: string;
//   stock?: string;
//   quantity?: string;
//   category?: string;
//   layout?: string;
//   switchType?: string;
//   isFeatured?: boolean;
// }

// const ItemForm = ({ type }: ItemFormProps) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

//   const getInitialState = () => {
//     const base = {
//       name: "",
//       price: "",
//       image: "",
//       description: "",
//       brand: "",
//     };
//     if (type === "keyboard") {
//       return { ...base, stock: "", category: "Keyboards", layout: "75%", switchType: "Mechanical", isFeatured: false };
//     }
//     if (type === "product") {
//        return { ...base, quantity: "", category: "Keyboards" };
//     }
//     return base;
//   };

//   const [formData, setFormData] = useState<FormData>(getInitialState() as FormData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type: inputType } = e.target;
//     const val = inputType === "checkbox" ? (e.target as HTMLInputElement).checked : value;
//     setFormData((prev) => ({ ...prev, [name]: val }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     const endpoint = type === "keycap" ? "/api/keycaps/create" : type === "keyboard" ? "/api/keyboard/create" : "/api/all-products/create";
//     const baseUrl = "https://t-mark-4.vercel.app";

//     try {
//       const response = await fetch(`${baseUrl}${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage({ type: "success", text: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!` });
//         setFormData(getInitialState());
//         setTimeout(() => router.push("/dashboard"), 2000);
//       } else {
//         setMessage({ type: "error", text: data.message || "Something went wrong" });
//       }
//     } catch {
//       setMessage({ type: "error", text: "Failed to connect to the server" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <h2 className="font-bebas text-3xl mb-6 tracking-wide text-[#1A1A1A]">
//         Create New {type.charAt(0).toUpperCase() + type.slice(1)}
//       </h2>

//       {message && (
//         <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Item Name</label>
//           <input
//             required
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="e.g. Sinner Mechanical Keyboard"
//             className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price ($)</label>
//           <input
//             required
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="199"
//             className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//           />
//         </div>

//         <div className="space-y-2 md:col-span-2">
//           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
//           <input
//             required
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="https://example.com/image.png"
//             className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//           />
//         </div>

//         <div className="space-y-2 md:col-span-2">
//           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
//           <textarea
//             required
//             name="description"
//             rows={4}
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Describe your item..."
//             className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm resize-none"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Brand</label>
//           <input
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//             placeholder="Tech Gear"
//             className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//           />
//         </div>

//         {type === "keyboard" && (
//           <>
//             <div className="space-y-2">
//               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 placeholder="100"
//                 className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Layout</label>
//               <select
//                 name="layout"
//                 value={formData.layout}
//                 onChange={handleChange}
//                 className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//               >
//                 <option value="60%">60%</option>
//                 <option value="65%">65%</option>
//                 <option value="75%">75%</option>
//                 <option value="TKL">TKL</option>
//                 <option value="Full Size">Full Size</option>
//               </select>
//             </div>
//             <div className="space-y-2">
//               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Switch Type</label>
//               <input
//                 name="switchType"
//                 value={formData.switchType}
//                 onChange={handleChange}
//                 placeholder="Mechanical"
//                 className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//               />
//             </div>
//           </>
//         )}

//         {type === "product" && (
//           <div className="space-y-2">
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quantity</label>
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               placeholder="100"
//               className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//             />
//           </div>
//         )}

//         {(type === "keyboard" || type === "product") && (
//           <div className="space-y-2">
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
//             <input
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Keyboards"
//               className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#D9FF00] transition-all text-sm"
//             />
//           </div>
//         )}

//         <div className="md:col-span-2 pt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-5 bg-[#D9FF00] text-[#1A1A1A] rounded-2xl font-bebas text-xl tracking-wider hover:shadow-[0_0_30px_rgba(217,255,0,0.3)] transition-all disabled:opacity-50 active:scale-[0.98]"
//           >
//             {loading ? "Creating..." : `Create ${type}`}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ItemForm;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type ItemType = "keycap" | "keyboard" | "product";

interface ItemFormProps {
  type: ItemType;
}

const ItemForm = ({ type }: ItemFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const getInitialState = () => ({
    name: "", price: "", image: "", description: "", brand: "",
    stock: "", category: "Keyboards", layout: "75%", switchType: "Mechanical"
  });

  const [formData, setFormData] = useState(getInitialState());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const baseUrl = "https://t-mark-4.vercel.app";
    const endpoint = type === "keycap" ? "/api/keycaps/create" : type === "keyboard" ? "/api/keyboard/create" : "/api/all-products/create";

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage({ type: "success", text: "Product added to registry." });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setMessage({ type: "error", text: "Check server configuration." });
      }
    } catch {
      setMessage({ type: "error", text: "Connection error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 selection:text-black">

      {/* Header Area */}
      <div className="text-center mb-12">
        <h2 className="text-white font-display text-4xl font-bold tracking-tight uppercase">
          New {type}
        </h2>
        <div className="h-[2px] w-12 bg-[#D9FF00] mx-auto mt-4" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-10 border border-white/5 rounded-none shadow-2xl"
      >
        {message && (
          <div className={`mb-8 p-4 text-xs font-bold tracking-widest uppercase border ${message.type === "success" ? "border-[#D9FF00] text-[#D9FF00]" : "border-red-500 text-red-500"
            }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Inputs */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Product Name</label>
            <input required name="name" value={formData.name} onChange={handleChange} className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#D9FF00] transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Price (USD)</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#D9FF00] transition-colors" />
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Image URL</label>
            <input required name="image" value={formData.image} onChange={handleChange} className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#D9FF00] transition-colors" />
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Description</label>
            <textarea required name="description" rows={2} value={formData.description} onChange={handleChange} className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#D9FF00] transition-colors resize-none" />
          </div>

          {type === "keyboard" && (
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Layout</label>
              <select name="layout" value={formData.layout} onChange={handleChange} className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#D9FF00] transition-colors cursor-pointer">
                <option value="60%" className="bg-[#121212]">60%</option>
                <option value="75%" className="bg-[#121212]">75%</option>
                <option value="TKL" className="bg-[#121212]">TKL</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Brand</label>
            <input name="brand" value={formData.brand} onChange={handleChange} className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#D9FF00] transition-colors" />
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-12 py-4 bg-[#D9FF00] text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-white transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : `Register ${type}`}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;