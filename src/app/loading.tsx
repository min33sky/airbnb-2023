import Loader from '@/components/Loader';

const SkeletonExample = () => {
  return (
    <div>
      <ul className="mt-44 space-y-2">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              <span
                className="inline-block h-5 w-full animate-pulse bg-slate-300"
                style={{
                  animationDelay: `${i * 50}ms`,
                  animationDuration: '1s',
                }}
              ></span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default function loading() {
  return <Loader />;
}
