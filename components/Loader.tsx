interface LoaderProps {
    show: Boolean
};

export default function Loader(props: LoaderProps) {
  return props.show ? <div className="loader"></div> : null;
}
