import {mutate} from 'swr';

export async function revalidateCache({
  keys = [],
  prefixes = [],
}: {
  keys?: Array<string | null | undefined>;
  prefixes?: Array<string | null | undefined>;
}) {
  const exactKeys = Array.from(new Set(keys.filter(Boolean))) as string[];
  const keyPrefixes = Array.from(new Set(prefixes.filter(Boolean))) as string[];

  await Promise.all([
    ...exactKeys.map((key) => mutate(key)),
    ...keyPrefixes.map((prefix) =>
      mutate((key) => typeof key === 'string' && key.startsWith(prefix))
    ),
  ]);
}
