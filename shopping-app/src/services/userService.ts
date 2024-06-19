export const login = async (email: string, password: string) => {
  return await fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((json) => {
      return json.find((user: any) => user.email === email && user.password === password);
    })
    .catch((error) => console.error(error));
};
