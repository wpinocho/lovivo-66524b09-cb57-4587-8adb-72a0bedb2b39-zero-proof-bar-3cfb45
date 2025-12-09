import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createBlogPost } from '@/lib/blog-helper'
import { useToast } from '@/hooks/use-toast'
import { FileText } from 'lucide-react'

export const CreateBlogButton = () => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const createSampleBlog = async () => {
    setLoading(true)
    try {
      const blogContent = `
        <h2>The Rise of Zero-Proof Culture</h2>
        <p>The conscious drinking movement has evolved beyond simple abstinence into a sophisticated lifestyle choice. Today's zero-proof spirits are crafted with the same attention to detail and complexity as their alcoholic counterparts, offering depth, character, and ritual without the buzz.</p>
        
        <h2>Why Choose Zero-Proof?</h2>
        <p>Whether you're taking a break from alcohol, driving, pregnant, or simply choosing wellness, zero-proof spirits allow you to participate fully in social experiences. Modern NA spirits capture the essence of traditional spirits through innovative distillation and botanical blending techniques.</p>
        
        <h2>Crafting the Perfect Zero-Proof Cocktail</h2>
        <p>The art of mixology isn't just about alcohol content—it's about balance, flavor, and experience. Our zero-proof spirits work beautifully in classic cocktail recipes:</p>
        
        <ul>
          <li><strong>Zero-Proof Negroni:</strong> Equal parts Aperitif Y2, Botanical Zero Gin, and sweet vermouth alternative</li>
          <li><strong>Mocktail Mojito:</strong> Crystal Clear Vodka, fresh mint, lime, and sparkling water</li>
          <li><strong>Y2K Old Fashioned:</strong> Y2 Whiskey Zero, bitters, sugar, and orange peel</li>
        </ul>
        
        <h2>The Science of Flavor</h2>
        <p>Zero-proof spirits use cutting-edge extraction methods to capture botanical essences. Steam distillation, cold pressing, and maceration create layers of flavor that mimic the warmth and complexity of traditional spirits—without the alcohol.</p>
        
        <h2>Building Your Home Bar</h2>
        <p>Start with our <strong>Starter Bundle</strong> to explore the range of zero-proof possibilities. A well-stocked NA bar should include:</p>
        
        <ul>
          <li>A botanical gin alternative for refreshing cocktails</li>
          <li>A whiskey or rum alternative for stirred classics</li>
          <li>An aperitif for bittersweet complexity</li>
          <li>Quality mixers, bitters, and fresh ingredients</li>
        </ul>
        
        <h2>The Future is Zero-Proof</h2>
        <p>As awareness grows about mindful drinking, the zero-proof category continues to innovate. From fermented tea bases to adaptogenic botanicals, the next generation of NA spirits promises even more sophisticated flavors and functional benefits.</p>
        
        <p>Ready to explore? Discover our full range of premium zero-proof spirits and elevate your cocktail game—no hangover required.</p>
      `

      await createBlogPost({
        title: 'The Ultimate Guide to Zero-Proof Cocktails',
        slug: 'ultimate-guide-zero-proof-cocktails',
        excerpt: 'Discover the art of crafting sophisticated mocktails with premium NA spirits. Learn techniques, recipes, and why the zero-proof movement is revolutionizing drink culture.',
        content: blogContent,
        featured_image: [
          'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/66524b09-cb57-4587-8adb-72a0bedb2b39/blog-mocktails-hero.jpg',
          'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/66524b09-cb57-4587-8adb-72a0bedb2b39/blog-ingredients.jpg',
          'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/66524b09-cb57-4587-8adb-72a0bedb2b39/blog-bottles.jpg'
        ],
        status: 'published'
      })

      toast({
        title: 'Blog post created!',
        description: 'The article has been published successfully.',
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'Failed to create blog post.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={createSampleBlog} 
      disabled={loading}
      className="fixed bottom-4 right-4 z-50 cyber-glow"
      size="lg"
    >
      <FileText className="mr-2 h-4 w-4" />
      {loading ? 'Creating...' : 'Create Blog Article'}
    </Button>
  )
}