
export async function POST(formData: FormData) {
  console.log('Formdata route handler:', formData)
  const res = await fetch('https://2699-2600-1700-7b00-5e10-f950-cd01-6b55-6042.ngrok-free.app/health-check/', {
    method: 'POST',
    body: formData,
  })
  console.log('Fromdata res:', res)

  const data = await res.json()

  return Response.json(data)
}