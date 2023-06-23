import React, { useEffect } from 'react'
import Header from "@/layout/header/index"
import Footer from "@/layout/footer/index"
import { MyComponentProp } from '@/types'
export default function index({ children }: MyComponentProp) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
