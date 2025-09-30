// Performance monitoring utilities
export const logPerformance = (operation: string, duration: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`⏱️ ${operation}: ${duration}ms`);
  }
};

export const measureApolloPerformance = () => {
  return {
    onRequest: (operation: any) => {
      const startTime = performance.now();
      operation.setContext({ startTime });
    },
    onResponse: (response: any) => {
      const { startTime } = response.operation.getContext();
      const duration = performance.now() - startTime;
      logPerformance(`GraphQL ${response.operation.operationName}`, duration);
    },
    onError: (error: any) => {
      const { startTime } = error.operation.getContext();
      const duration = performance.now() - startTime;
      console.error(`❌ GraphQL Error after ${duration}ms:`, error);
    }
  };
};