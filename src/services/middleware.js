export const middleware = (request) => {
  const tokenCookie = request.cookies.get("next-auth.session-token");
  console.log("Token cookie:", tokenCookie); // For debugging

  if (!tokenCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};
