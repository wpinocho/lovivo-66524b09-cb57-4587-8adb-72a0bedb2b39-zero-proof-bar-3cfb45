import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-card border-border overflow-hidden hover:cyber-glow transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="aspect-[16/10] bg-muted overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>
        
        <div className="p-6 relative">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-foreground font-black text-2xl">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-bold cyber-glow">
                Featured
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full cyber-border hover:cyber-glow font-bold"
            variant="outline"
            onClick={() => onViewProducts(collection.id)}
          >
            Explore Collection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}