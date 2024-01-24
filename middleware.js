import {NextResponse} from 'next/server'

export function middleware(request) {
    const currentUser = request.cookies.get('token')?.value

    if (currentUser) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
