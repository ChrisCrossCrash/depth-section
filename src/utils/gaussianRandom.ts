/** Generate a randomly sampled number, given a mean and a standard distribution. */
export const gaussianRandom = (mean: number, std: number) => {
  const u1 = Math.random()
  const u2 = Math.random()
  const randStdNormal =
    Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2)
  return mean + std * randStdNormal
}
