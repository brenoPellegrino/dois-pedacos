export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    invalidData: 422,
    unauthorized: 401,
    notFound: 404,
  };
  return statusHTTPMap[status] || 500;
}
