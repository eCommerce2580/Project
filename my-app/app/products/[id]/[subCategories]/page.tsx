import Store from '@/components/ui/Store';
import React from 'react';


export default function Page({ params }: { params: { id: string; subCategories: string } }) {
    const categoryIdAndSubId = {
        categoryId: params.id,
        subCategoryId: params.subCategories
    };
    
    return (
        <div> 
            <Store categoryIdAndSubId={categoryIdAndSubId} />
        </div>
    );
}
