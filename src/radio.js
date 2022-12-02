export const Radio = (props) => {
    const { changed, isSelected, label, value } = props;
    return (
      <div className="Radio">
        <input
          onChange={changed}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <label>{label}</label>
      </div>
    );
  };