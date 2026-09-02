'use client'

import { useState } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FileUploadProps {
  label?: string
  value?: string | null
  onChange: (url: string) => void
  accept?: string
}

export function FileUpload({ label = 'Upload Image', value, onChange, accept = 'image/*' }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      onChange(publicUrlData.publicUrl)
    } catch (err: any) {
      console.error('Error uploading file:', err)
      setError(err.message || 'Error uploading file')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-white/40 mb-2 uppercase tracking-wider">{label}</label>
      
      {error && (
        <div className="text-red-400 text-xs mb-2">{error}</div>
      )}

      {value ? (
        <div className="relative inline-block border border-white/10 rounded-xl overflow-hidden bg-white/5 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded preview" className="max-h-32 rounded-lg object-contain bg-black/20" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="mt-2 text-xs text-white/40 break-all px-1">{value}</div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl hover:border-[#E52521]/50 hover:bg-[#E52521]/5 transition-colors cursor-pointer bg-white/5 relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-[#E52521] animate-spin mb-2" />
            ) : (
              <Upload className="w-8 h-8 text-white/40 mb-2" />
            )}
            <p className="mb-1 text-sm text-white/60">
              {isUploading ? 'Uploading...' : <><span className="font-semibold text-white">Click to upload</span> or drag and drop</>}
            </p>
            {!isUploading && <p className="text-xs text-white/30">SVG, PNG, JPG or GIF (max 5MB)</p>}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleUpload} 
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  )
}
