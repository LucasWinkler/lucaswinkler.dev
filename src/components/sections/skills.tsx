import { Container } from "@/components/layout/container";

//   {
//     name: "Figma",
//     description: "Design Tool",
//     icon: (
//       <svg viewBox="0 0 38 57" className="h-8 w-8" fill="currentColor">
//         <path
//           fillRule="evenodd"
//           d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Zm9.5-28.5a9.5 9.5 0 0 0-9.5 9.5v9.5h9.5a9.5 9.5 0 0 0 0-19ZM19 0a9.5 9.5 0 0 0-9.5 9.5v9.5H19V0ZM9.5 28.5a9.5 9.5 0 0 0 9.5 9.5V19H9.5v9.5ZM19 47.5a9.5 9.5 0 1 1 0-19v19Z"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "TypeScript",
//     description: "JavaScript but better",
//     icon: (
//       <svg viewBox="0 0 48 48" className="h-8 w-8" fill="currentColor">
//         <path d="M11.383 13.644h25.234V34.36H11.383z" />
//         <path
//           fill="#fff"
//           d="M31.428 29.447v3.311a5.464 5.464 0 0 0 1.838 1.276c.705.28 1.51.419 2.412.419.83 0 1.61-.13 2.338-.392.728-.261 1.361-.637 1.899-1.128a5.187 5.187 0 0 0 1.272-1.802c.308-.71.462-1.519.462-2.425 0-.705-.087-1.335-.262-1.89a4.577 4.577 0 0 0-.77-1.446 5.813 5.813 0 0 0-1.241-1.154 11.65 11.65 0 0 0-1.675-.98c-.457-.23-.89-.445-1.297-.645a5.466 5.466 0 0 1-.98-.595 2.236 2.236 0 0 1-.63-.654 1.53 1.53 0 0 1-.219-.827c0-.279.066-.529.201-.75.134-.22.318-.41.55-.567.233-.158.51-.279.827-.366.318-.087.664-.131 1.037-.131.276 0 .569.028.88.087.31.06.619.152.927.28.308.126.606.288.893.487.288.198.548.43.784.697v-3.136a6.555 6.555 0 0 0-1.707-.741 8.02 8.02 0 0 0-2.239-.306c-.816 0-1.584.132-2.303.397a5.824 5.824 0 0 0-1.864 1.111 5.28 5.28 0 0 0-1.254 1.72 5.077 5.077 0 0 0-.462 2.197c0 .98.219 1.82.654 2.52.436.7.997 1.306 1.681 1.82.684.513 1.433.95 2.25 1.31.476.213.91.423 1.302.628.392.204.728.417 1.007.637.279.22.496.458.654.715.157.257.236.549.236.875 0 .257-.061.496-.184.715a1.832 1.832 0 0 1-.514.575c-.22.165-.483.294-.793.384a3.757 3.757 0 0 1-1.007.136c-.427 0-.854-.066-1.28-.197a5.32 5.32 0 0 1-1.18-.523 5.606 5.606 0 0 1-1.007-.741c-.3-.276-.558-.558-.775-.849zM27.209 22.056h-4.078v13.428h-3.428V22.056h-4.096v-2.738h11.602z"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "React",
//     description: "JavaScript Library",
//     icon: (
//       <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
//         <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Next.js",
//     description: "React framework",
//     icon: (
//       <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
//         <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Tailwind",
//     description: "CSS framework",
//     icon: (
//       <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
//         <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Git",
//     description: "Version control",
//     icon: (
//       <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
//         <path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6 0 1.846 1.846 0 0 1-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348a1.848 1.848 0 0 1 0 2.6 1.844 1.844 0 0 1-2.609 0 1.834 1.834 0 0 1 0-2.598c.182-.18.387-.316.605-.406V8.835a1.834 1.834 0 0 1-.996-2.41L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477a1.55 1.55 0 0 0 2.188 0l10.428-10.428a1.55 1.55 0 0 0 0-2.189" />
//       </svg>
//     ),
//   },
//   {
//     name: "Supabase",
//     description: "Backend tool",
//     icon: (
//       <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
//         <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66zM12 13.199h-7.2l7.2-9.735v9.735zm0 9.601v-9.735h7.2l-7.2 9.735z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Appwrite",
//     description: "Backend tool",
//     icon: (
//       <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
//         <path d="M2.044 0v24l19.912-12Z" />
//       </svg>
//     ),
//   },
// ] as const;

export const Skills = () => {
  return (
    <section>
      <Container>Skills</Container>
    </section>
  );
};
