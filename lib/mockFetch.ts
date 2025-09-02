// Utility to simulate network delay for fetching data
export async function mockFetch<T>(data: T, delay: number = 1000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

// Simulate different loading times for different content types
export const fetchDelays = {
  video: 1500,
  quiz: 800,
  content: 600,
  fast: 300,
} as const;

export type FetchDelayType = keyof typeof fetchDelays;
