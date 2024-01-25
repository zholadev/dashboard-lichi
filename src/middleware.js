import {NextResponse} from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const currentUser = request.cookies.get('dashboard-token')?.value

    if (currentUser && path === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!currentUser && path !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
