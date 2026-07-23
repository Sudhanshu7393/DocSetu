"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Save,
  Eye,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getDocumentBySlug } from "@/data/documents";
import { getCategoryBySlug } from "@/data/categories";
import { DocumentTemplate, FormField, FormStep } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Field components ────────────────────────────────────────
function renderField(
  field: FormField,
  value: string,
  onChange: (val: string) => void,
  error?: string
) {
  const baseClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm";

  const errorClass = error
    ? "border-red-400 dark:border-red-500 focus:ring-red-400"
    : "";

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          className={cn(baseClass, errorClass, "resize-none")}
        />
      );

    case "select":
      return (
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseClass, errorClass, "cursor-pointer")}
        >
          <option value="">— Select an option —</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="space-y-2.5">
          {field.options?.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all",
                value === opt.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
              )}
            >
              <input
                type="radio"
                name={field.id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all",
                  value === opt.value
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-300 dark:border-slate-600"
                )}
              >
                {value === opt.value && (
                  <div className="w-full h-full rounded-full bg-white scale-50 flex items-center justify-center" />
                )}
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-200">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      );

    case "currency":
      return (
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
            {field.prefix || "₹"}
          </span>
          <input
            id={field.id}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={cn(baseClass, errorClass, "pl-9")}
          />
        </div>
      );

    case "date":
      return (
        <input
          id={field.id}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseClass, errorClass)}
        />
      );

    case "number":
      return (
        <input
          id={field.id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn(baseClass, errorClass)}
        />
      );

    case "email":
      return (
        <input
          id={field.id}
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn(baseClass, errorClass)}
        />
      );

    case "phone":
      return (
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            +91
          </span>
          <input
            id={field.id}
            type="tel"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || "XXXXX XXXXX"}
            className={cn(baseClass, errorClass, "pl-12")}
          />
        </div>
      );

    default:
      return (
        <input
          id={field.id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn(baseClass, errorClass)}
        />
      );
  }
}

// ─── Step Component ───────────────────────────────────────────
function StepForm({
  step,
  formData,
  errors,
  onChange,
}: {
  step: FormStep;
  formData: Record<string, string>;
  errors: Record<string, string>;
  onChange: (id: string, val: string) => void;
}) {
  return (
    <div className="space-y-6">
      {step.fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
          >
            {field.label}
            {field.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>

          {field.helpText && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-start gap-1.5">
              <AlertCircle size={11} className="flex-shrink-0 mt-0.5" />
              {field.helpText}
            </p>
          )}

          {renderField(
            field,
            formData[field.id] || "",
            (val) => onChange(field.id, val),
            errors[field.id]
          )}

          {errors[field.id] && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={11} />
              {errors[field.id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────
function ProgressHeader({
  doc,
  currentStep,
  totalSteps,
}: {
  doc: DocumentTemplate;
  currentStep: number;
  totalSteps: number;
}) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Creating: <span className="text-slate-800 dark:text-slate-200">{doc.name}</span>
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Section {currentStep + 1} of {totalSteps}:{" "}
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {doc.steps[currentStep]?.title}
              </span>
            </p>
          </div>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step pills (desktop) */}
        <div className="hidden sm:flex items-center gap-2 mt-3 overflow-x-auto pb-1">
          {doc.steps.map((step, i) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-all",
                i < currentStep
                  ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400"
                  : i === currentStep
                  ? "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400"
              )}
            >
              {i < currentStep ? (
                <CheckCircle size={11} />
              ) : (
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
              )}
              {step.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Wizard Page ─────────────────────────────────────────
export default function GeneratePage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const doc = getDocumentBySlug(slug);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-2xl mb-2">📄</p>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Document not found
          </h1>
          <Link href="/categories" className="text-blue-600 dark:text-blue-400 text-sm">
            Browse all documents
          </Link>
        </div>
      </div>
    );
  }

  const step = doc.steps[currentStep];
  const totalSteps = doc.steps.length;

  const handleChange = useCallback((id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const field of step.fields) {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Save and go to preview
      handleSaveAndPreview();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveDraft = () => {
    setSaving(true);
    // Simulate save — in production this calls the API
    setTimeout(() => {
      const draft = {
        id: `draft-${Date.now()}`,
        templateId: doc.id,
        templateName: doc.name,
        formData,
        currentStep,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(`docsetu-draft-${doc.slug}`, JSON.stringify(draft));
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const handleSaveAndPreview = () => {
    setSaving(true);
    const docData = {
      id: `doc-${Date.now()}`,
      templateId: doc.id,
      templateName: doc.name,
      formData,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(`docsetu-doc-${doc.slug}`, JSON.stringify(docData));
    setTimeout(() => {
      router.push(`/preview/${doc.slug}`);
    }, 600);
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16">
      <ProgressHeader
        doc={doc}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Step header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {currentStep + 1}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {step.title}
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-11">
            {step.description}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 mb-6">
          <StepForm
            step={step}
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        </div>

        {/* Validation error banner */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">
              Please fill in all required fields before continuing.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all",
                currentStep === 0
                  ? "opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-700 text-slate-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <ChevronLeft size={16} /> Back
            </button>

            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : saved ? (
                <CheckCircle size={14} className="text-green-500" />
              ) : (
                <Save size={14} />
              )}
              {saved ? "Saved!" : "Save Draft"}
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={saving}
            className="flex items-center gap-2.5 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isLastStep ? "Generating..." : "Saving..."}
              </>
            ) : isLastStep ? (
              <>
                <Eye size={16} />
                Preview Document
              </>
            ) : (
              <>
                Continue
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>

        {/* Bottom tip */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
          Your responses are auto-saved locally. We do not share your data.
        </p>
      </div>
    </div>
  );
}
