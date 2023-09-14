interface FooterProps { }
const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <a
        className="pointer-events-none flex items-end gap-2 p-8 lg:pointer-events-auto lg:p-0"
        href="https://github.com/prashantkhandelwal/cannon/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="mb-0.5"> By </p> {' '} <h2 className="text-2xl font-bold"> Team Cannon </h2>
      </a>
    </div>
  )
}

export default Footer;
