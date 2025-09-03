import ProductView from '@/modules/products/ui/views/product-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface Props {
  params: Promise<{
    productId: string;
    slug: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { productId, slug } = await params;

  const queyClient = getQueryClient();
  void queyClient.prefetchQuery(
    trpc.products.getOne.queryOptions({ id: productId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queyClient)}>
      <ProductView productId={productId} tenantSlug={slug} />
    </HydrationBoundary>
  );
};

export default Page;
