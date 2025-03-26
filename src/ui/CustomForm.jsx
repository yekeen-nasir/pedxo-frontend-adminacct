function CustomForm({ onSubmit, children }) {
  return (
    <form
      className="flex flex-col gap-4 items-center w-full"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default CustomForm;
