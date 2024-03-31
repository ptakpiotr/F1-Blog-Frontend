import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";
import type { AppTableColumns } from "../Types";

interface IProps<T> {
  items: T[];
  columns: AppTableColumns<T>;
  renderer: (item: T) => JSX.Element;
}

function AppTable<T extends {}>({ columns, items, renderer }: IProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.columnKey as string}>
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{items.map((i) => renderer(i))}</TableBody>
    </Table>
  );
}

export default AppTable;
