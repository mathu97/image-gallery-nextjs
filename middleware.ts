// This function can be marked `async` if using `await` inside
export function middleware() {
  console.log("Middleware invoked");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/static",
};
