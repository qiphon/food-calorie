import { Card, Input } from "antd";
import { debounce } from "lodash-es";

type Props = {
  onSearch: (val: string) => void;
};
const Searcher = ({ onSearch }: Props) => {
  const search = debounce(onSearch, 500);
  return (
    <Card>
      <Input
        type="search"
        onChange={(ev) => {
          search(ev.target.value);
        }}
      />
    </Card>
  );
};

export default Searcher;
