import Layout from "../components/Layout";

export default function Videos() {
    
  return (
    <Layout>
<div className="bg-main h-screen w-full flex flex-col items-center justify-center text-white pb-20">
      <h1 className="text-3xl mb-4">Videos</h1>

      <div className="bg-black/50 backdrop-blur-md px-6 py-4 rounded-xl text-center">
        <p className="text-lg">🚧 Under Construction</p>
        <p className="text-sm text-gray-300 mt-2">
          Próximamente encontrarás contenido especial aquí
        </p>
      </div>

    </div>
    </Layout>
  );
}