import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const AboutUs = ({ currentPath }) => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      <Navbar currentPath={currentPath} />

      <section
        className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/teams/gambar-hero.HEIC')",
        }}
      >
        <div className="text-center p-8">
          <h1 className="text-4xl md:text-6xl text-white font-bold">
            Our Journey
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl">
            From a simple idea to a growing movement
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <img
              src="/teams/gambar-sendiri.jpg"
              className="w-full md:w-1/2 rounded-2xl shadow-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-semibold">Where It All Began</h2>
              <p className="text-gray-600 leading-relaxed">
                Berawal dari langkah kecil seorang pemuda bernama Amir Faisal
                Karimullah yang memulai semuanya dari kamar kos sederhana dengan
                satu tekad: membantu para pelaku UMKM mendapatkan bekal,
                dukungan, dan kesempatan yang lebih baik.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dari meja kecil dan mimpi besar itu, perjalanan dimulai. Amir
                perlahan menemukan teman-teman yang percaya pada visi yang sama
                hingga akhirnya mereka membangun langkah ini bersama.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-semibold">
                The Company Takes Shape
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Kami mulai fokus, membangun pondasi, menyempurnakan gagasan, dan
                belajar langsung dari pengalaman nyata para UMKM bukan hanya
                teori.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Setiap pencapaian kecil kami terwujud berkat keberanian
                orang-orang yang mau bermimpi lebih besar bersama kami.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Tahap ini terdapat momen penting seperti penandatanganan MoU
                pertama kami dengan{" "}
                <strong>
                  Arby Pratama sebagai Co Founder & CBDO dan Arba'in Prasetyo
                  sebagai Co Founder & CMO
                </strong>
              </p>
            </div>
            <img
              src="/teams/gambar-mou.jpg"
              className="w-full md:w-1/2 rounded-2xl shadow-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            <img
              src="/teams/gambar-partner.jpg"
              className="w-full md:w-1/2 rounded-2xl shadow-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-semibold">Today & Beyond</h2>
              <p className="text-gray-600 leading-relaxed">
                Hari ini, kami berada pada fase yang semakin matang memperkuat
                tim, menata legalitas, dan menyiapkan produk yang benar-benar
                memberi dampak nyata bagi dunia UMKM.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dan perjalanan ini baru saja dimulai. Kami ingin menjadi
                jembatan pertumbuhan bagi seluruh pebisnis dan UMKM di
                Indonesia.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center">Meet Our Team</h2>
        <p className="text-xl font-bold text-center mb-16">
          "if we'll be united we're stronger together"
        </p>

        <div className="flex flex-col items-center mb-16">
          <img
            src="/teams/faisal.jpg"
            className="w-44 h-44 object-cover rounded-full shadow-xl"
          />
          <h3 className="mt-4 text-2xl font-semibold">
            Amir Faisal Karimullah
          </h3>
          <p className="text-gray-500 text-sm">Founder & CEO</p>
        </div>

        <div className="w-full flex justify-center mb-16">
          <div className="w-1 h-20 bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/arby.jpg"
              className="w-36 h-36 object-cover rounded-full shadow-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Arby Pratama</h3>
            <p className="text-gray-500 text-sm">
              Co-Founder & Chief Bussiness Development Officer
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/arbain.jpg"
              className="w-36 h-36 object-cover rounded-full shadow-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Arba'in Prasetyo</h3>
            <p className="text-gray-500 text-sm">
              Co-Founder & Chief Marketing Officer
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center mb-16">
          <div className="w-1 h-20 bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/REZA.png"
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <h3 className="mt-4 text-lg font-semibold">Syahreza Yusuf</h3>
            <p className="text-gray-500 text-sm">Digital Strategist </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/RizkySeptianaAdjie.png"
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <h3 className="mt-4 text-lg font-semibold">Rizky Septiana Adjie</h3>
            <p className="text-gray-500 text-sm">Legal Officer</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/dewi.png"
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <h3 className="mt-4 text-lg font-semibold">Dewi Sri Tunjungsari</h3>
            <p className="text-gray-500 text-sm">
              Business development, Strategic and Partnership
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center mb-16 mt-16">
          <div className="w-1 h-20 bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/putri.jpg"
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <h3 className="mt-4 text-lg font-semibold">Puspita Putri</h3>
            <p className="text-gray-500 text-sm">
              Head of Administration Intern
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/tari.jpg"
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <h3 className="mt-4 text-lg font-semibold">Rizki Lestari</h3>
            <p className="text-gray-500 text-sm">Graphic Designer Intern</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/Tristan-Aidinizhar.jpg"
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <h3 className="mt-4 text-lg font-semibold">Tristan Aidinizhar</h3>
            <p className="text-gray-500 text-sm">Graphic Designer Intern</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="/teams/sabrina.jpeg"
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <h3 className="mt-4 text-lg font-semibold">
              Sabrina Putri Michellia
            </h3>
            <p className="text-gray-500 text-sm">Partnership & Secretary Intern</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-16 text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl font-medium text-gray-700 max-w-3xl mx-auto"
        >
          "We are here not just to build products but to build hope,
          opportunity, and a better future for everyone who dares to try."
        </motion.p>
      </section>
    </div>
  );
};

export default AboutUs;
