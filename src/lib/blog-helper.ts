import { supabase } from './supabase'
import { STORE_ID } from './config'

export const createBlogPost = async (blogData: {
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string[]
  status?: string
}) => {
  try {
    const { data, error } = await supabase
      .from('content')
      .insert({
        ...blogData,
        store_id: STORE_ID,
        status: blogData.status || 'published'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating blog post:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in createBlogPost:', error)
    throw error
  }
}