export const contractHash = (hash: string, size = 10) => {
  return hash && hash.length > size * 2
    ? `${hash.slice(0, size)}...${hash.slice(hash.length - size)}`
    : hash
}
