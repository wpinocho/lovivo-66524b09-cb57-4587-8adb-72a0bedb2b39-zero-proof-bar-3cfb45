import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, type Blog } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

const BlogPost = () => {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setNotFound(true)
      return
    }
    fetchBlog(slug)
  }, [slug])

  const fetchBlog = async (blogSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('slug', blogSlug)
        .eq('status', 'published')
        .eq('store_id', STORE_ID)
        .single()

      if (error) {
        console.error('Error fetching blog:', error)
        setNotFound(true)
        return
      }
      
      setBlog(data)
    } catch (error) {
      console.error('Error fetching blog:', error)
      setNotFound(true)
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

  const renderContentWithImages = (content: string, images?: string[]) => {
    if (!images || images.length <= 1) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }

    // Si hay más de una imagen, insertamos las adicionales en el contenido
    const additionalImages = images.slice(1) // Excluir la primera imagen (ya mostrada como featured)
    const paragraphs = content.split('</p>')
    
    let result: JSX.Element[] = []
    
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        result.push(
          <div key={`paragraph-${index}`} dangerouslySetInnerHTML={{ __html: paragraph + '</p>' }} />
        )
        
        // Insertar imagen después de ciertos párrafos
        const imageIndex = Math.floor((index + 1) * additionalImages.length / paragraphs.length)
        if (imageIndex < additionalImages.length && imageIndex > 0 && !result.find(el => el.key === `image-${imageIndex}`)) {
          result.push(
            <div key={`image-${imageIndex}`} className="my-12">
              <img 
                src={additionalImages[imageIndex - 1]}
                alt={`Article image ${imageIndex}`}
                className="w-full max-w-3xl mx-auto rounded-lg object-cover cyber-border"
              />
            </div>
          )
        }
      }
    })

    return <>{result}</>
  }

  if (loading) {
    return (
      <EcommerceTemplate showCart={true}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted/20 rounded-md mb-8 cyber-border"></div>
            <div className="h-96 bg-muted/20 rounded-md mb-8 cyber-border"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted/20 rounded-md cyber-border"></div>
              <div className="h-4 bg-muted/20 rounded-md cyber-border"></div>
              <div className="h-4 bg-muted/20 rounded-md w-3/4 cyber-border"></div>
            </div>
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (notFound || !blog) {
    return (
      <EcommerceTemplate showCart={true}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="border-dashed">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-muted p-6">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">Blog post not found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    The blog post you're looking for doesn't exist or has been removed.
                  </p>
                </div>
                <Button 
                  size="lg"
                  asChild
                  className="mt-4"
                >
                  <Link to="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </EcommerceTemplate>
    )
  }

  return (
    <EcommerceTemplate showCart={true}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to blog button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/blog')}
          className="cyber-border hover:cyber-glow flex items-center gap-2 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-bold uppercase tracking-wider">Back to Blog</span>
        </Button>

        <article>
          {/* Featured Image */}
          {blog.featured_image && blog.featured_image.length > 0 && (
            <div className="mb-12 rounded-lg overflow-hidden cyber-border">
              <img 
                src={blog.featured_image[0]} 
                alt={blog.title}
                className="w-full h-72 md:h-[500px] object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center text-xs text-primary mb-4 font-bold uppercase tracking-wider">
              <Calendar className="h-3 w-3 mr-2" />
              {blog.created_at && formatDate(blog.created_at)}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 cyber-text-glow leading-tight">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-xl text-secondary leading-relaxed max-w-3xl mx-auto">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-black prose-headings:cyber-text-glow prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-primary prose-strong:font-bold prose-ul:text-foreground prose-li:mb-2">
            {blog.content ? (
              <div className="text-foreground leading-relaxed">
                {renderContentWithImages(blog.content, blog.featured_image)}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No content available for this article.</p>
            )}
          </div>
        </article>
      </div>
    </EcommerceTemplate>
  )
}

export default BlogPost