"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import SearchableMultiDropdown from "../../../components/ui/SearchableMultiDropdown";
import { useAppDispatch } from "@/app/api/hello/store";
import { addNewCategory, addNewPost, getCategories } from "@/app/api/hello/wordSlice";

interface FormData {
  title: string;
  description: string;
  category: string[];
}

export default function post() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: [],
  });

  const fetchCategories = async () => {
    console.log("Dispatching categories action");
    try {
      const res = await dispatch(getCategories());
      setCategory(res.payload.data);
      console.log("categories fetched:", res);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSaveCategory = (newItem: string[]) => {
    const payload = {
      category: newItem,
    };
    dispatch(addNewCategory(payload))
      .then(() => {
        fetchCategories();
      })
      .catch((err) => {
        console.log("Error adding new category:", err);
      });
  };

  const handleSelectCategory = (selectedItems: string[]) => {
    setSelectedCategories(selectedItems);
    setFormData({
      ...formData,
      category: selectedItems,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(addNewPost(formData))
    .then(() => {
        setSelectedCategories([])
        setFormData({
          title: "",
          description: "",
          category: [],
        });
        fetchCategories();
      })
      .catch((err) => {
        console.log("Error adding new post:", err);
      });
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Expressing the World Through Words
            </h1>
          </div>
          {/* Contact form */}
          <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="title"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="form-input w-full"
                  placeholder="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="description"
                >
                  Poetry Description <span className="text-red-500">*</span>
                </label>
                <input
                  id="description"
                  name="description"
                  className="form-input w-full"
                  placeholder="Description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <SearchableMultiDropdown
                  label=""
                  options={category}
                  onSelect={handleSelectCategory}
                  add={handleSaveCategory}
                />
              </div>
              
            </div>
            <div className="mt-6 space-y-5">
              <button
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                type="submit"
              >
                Submit
              </button>
              
            </div>
          </form>
          
        </div>
      </div>
    </section>
  );
}
