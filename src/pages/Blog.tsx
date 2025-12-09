import { useEffect, useState } from 'react'
import { supabase, type Blog } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('status', 'published')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching blogs:', error)
        return
      }
      
      setBlogs(data || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <EcommerceTemplate pageTitle="Blog" showCart={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 cyber-text-glow">Zero-Proof Insights</h1>
          <p className="text-xl text-secondary">Recipes, tips & the latest in NA spirits</p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted/20 rounded-lg h-96 animate-pulse cyber-border"></div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article 
                key={blog.id}
                className="group bg-card rounded-lg cyber-border overflow-hidden hover:cyber-glow transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                {blog.featured_image && blog.featured_image.length > 0 && (
                  <div className="relative aspect-w-16 aspect-h-9 bg-muted overflow-hidden">
                    <img 
                      src={blog.featured_image[0]} 
                      alt={blog.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-xs text-primary mb-3 font-bold uppercase tracking-wider">
                    <Calendar className="h-3 w-3 mr-2" />
                    {blog.created_at && formatDate(blog.created_at)}
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {blog.title}
                  </h2>
                  {blog.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-primary text-sm font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-300">
                    <span>Read Article</span>
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-8 rounded-lg cyber-border bg-card/50">
              <p className="text-muted-foreground text-lg">No articles yet. Check back soon for zero-proof inspiration!</p>
            </div>
          </div>
        )}
      </div>
    </EcommerceTemplate>
  )
}

export default BlogPage