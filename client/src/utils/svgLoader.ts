/**
 * @file 加载svg
 */

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
const svgs = (require as any).context('../assets/svg', false, /\.svg$/);
requireAll(svgs);

export {};
