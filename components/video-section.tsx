export default function VideoSection() {
  return (
    <section className="relative bg-background py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-balance leading-tight tracking-tight mb-2 sm:mb-3">
              MountPole at Industry Exhibitions
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60 font-light max-w-2xl mx-auto">
              Watch our team showcasing premium wholesale electronics solutions at major industry exhibitions across
              North America
            </p>
          </div>

          {/* YouTube Video Embed */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary border border-border/20 shadow-sm">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/-RBEBLuXd20?si=NExTWyxR85MpRkCt&autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0"
              title="MountPole Team at Industry Exhibition"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
