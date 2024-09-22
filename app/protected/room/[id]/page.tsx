export default function Page({ params }: { params: { id: string } }) {
    return <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#333' }}>My Post: {params.id}</div>
  }