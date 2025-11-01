import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    description: 'Clean, professional look with a neutral grey backdrop.',
    prompt:
      'Generate a professional corporate headshot of the person in the image. The background should be a solid, neutral grey. The lighting should be soft and even, typical of a studio setting. The person should be looking directly at the camera with a confident yet approachable expression. The attire should appear professional and suitable for a corporate environment. Do not alter the person\'s core facial features, but enhance the overall quality to a professional standard.',
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    description: 'A contemporary office setting with soft, blurred background.',
    prompt:
      'Generate a professional headshot of the person in the image. The setting should be a modern, bright tech office with a tastefully blurred background. The lighting should be natural and flattering. The person should have a friendly and engaging expression. The attire should be smart-casual. Do not alter the person\'s core facial features, but enhance the overall quality to a professional standard.',
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    description: 'Warm, natural light with a pleasant outdoor park background.',
    prompt:
      'Generate a professional headshot of the person in the image. The setting should be a pleasant, out-of-focus outdoor park or green space. The lighting should be warm, natural sunlight (golden hour is preferred). The person should have a relaxed and authentic expression. The attire can be casual. Do not alter the person\'s core facial features, but enhance the overall quality to a professional standard.',
  },
  {
    id: 'black-and-white',
    name: 'Classic B&W',
    description: 'A timeless, dramatic black and white portrait.',
    prompt:
      'Generate a dramatic, high-contrast black and white headshot of the person in the image. The lighting should be strong and directional to create interesting shadows (Rembrandt lighting). The background should be a dark, solid color. The expression should be thoughtful and compelling. Do not alter the person\'s core facial features, but enhance the overall quality to a professional standard.',
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    description: 'Sepia tones, grainy texture, and a nostalgic feel.',
    prompt:
      'Generate a vintage, film-style headshot of the person in the image. The photo should have a warm, sepia-toned color palette and a subtle film grain texture. The lighting should be soft and reminiscent of early 20th-century portrait photography. The attire should be styled to look classic and timeless. The person\'s expression should be poised and elegant. Do not alter the person\'s core facial features, but adapt the overall image to a convincing vintage film aesthetic.',
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Vibrant neon light with futuristic, sci-fi elements.',
    prompt:
      'Generate a cyberpunk-themed headshot of the person in the image. The setting should be a futuristic, urban environment at night, illuminated by vibrant pink, blue, and purple neon lights. The lighting should cast dramatic and colorful reflections on the person. Consider adding subtle futuristic elements like glowing cybernetic details or high-tech clothing. The expression should be cool and edgy. Do not alter the person\'s core facial features, but integrate them seamlessly into a high-tech, cyberpunk world.',
  },
  {
    id: 'minimalist-studio',
    name: 'Minimalist Studio',
    description: 'Clean and simple with a solid, vibrant color background.',
    prompt:
      'Generate a clean, minimalist studio headshot of the person in the image. The background should be a solid, vibrant color like mustard yellow or teal. The lighting should be bright, crisp, and direct, creating a modern and energetic feel with minimal shadows. The attire should be simple and solid-colored to complement the background. The expression should be confident and direct. Do not alter the person\'s core facial features, but enhance the photo with a sharp, high-fashion quality.',
  },
];
