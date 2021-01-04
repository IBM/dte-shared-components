import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DataTable, DataTableSkeleton, Modal, Pagination } from "carbon-components-react";
import { pick, startCase } from "lodash";

import { getDataTableDefaults, translateDiff } from "lib/audit";
import { toLocaleDateString } from "lib/utils";
import Markdown from "./Markdown";

const Styled = styled.span`
  & .auditlog {
    hr {
      border: 1px dotted #e0e0e0;
    }
  }
`;

const {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbar,
  TableToolbarSearch,
} = DataTable;

const DATA_TABLE_DEFAULTS = getDataTableDefaults();

const Auditlog = ({
  headers,
  namespace,
  message,
  modalLabel,
  modalAriaLabel,
  modalHeading,
  onLoad,
  onClose,
  zebra,
  wrap,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(DATA_TABLE_DEFAULTS.pagination);
  const [pageMin, setPageMin] = useState(0);
  const [pageMax, setPageMax] = useState(0);

  useEffect(() => {
    setPagination({ ...pagination, page: 1, totalItems: items.length || 0 });
  }, [items]);

  useEffect(() => {
    const min = (pagination.page - 1) * pagination.pageSize;
    const max =
      pagination.totalItems > min + pagination.pageSize
        ? min + pagination.pageSize - 1
        : pagination.totalItems;
    setPageMin(min);
    setPageMax(max);
  }, [pagination]);

  const onPaginationChange = (input) => {
    let p = { ...pagination };
    p.pageSize = input.pageSize || 10;
    p.page = input.page || 1;
    // if () p.isLastPage = true;
    setPagination(p);
  };

  useEffect(() => {
    setTimeout(async () => {
      try {
        let data = (await onLoad()) || [];
        let sub = headers.map((o) => o.key);
        data = data.map((o) => {
          let d = pick(o, sub);
          d.id = o.id;
          d.action = startCase(d.action);
          d.createdAt = toLocaleDateString(d.createdAt, "llll");
          d.diff = translateDiff(d.diff);
          return d;
        });
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.log("Error", err.message || err);
      }
    }, 750);
  }, []);

  let content = loading ? (
    <DataTableSkeleton
      columnCount={headers.length}
      compact={false}
      headers={headers}
      rowCount={5}
      zebra={zebra}
    />
  ) : (
    <Styled>
      <DataTable
        columnCount={headers.length}
        compact={false}
        isSortable={true}
        stickyHeader={true}
        useZebraStyles={true}
        headers={headers}
        rows={items}
        render={({ rows, headers, getHeaderProps, onInputChange }) => (
          <TableContainer className={namespace}>
            <TableToolbar>
              <TableToolbarSearch onChange={onInputChange} />
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header, idx) => (
                    <TableHeader key={idx} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!rows || rows.length == 0 ? (
                  <TableRow key={0}>
                    <TableCell className="cell" key={1} colSpan={headers.length - 1}>
                      {DATA_TABLE_DEFAULTS.noresults || message}
                    </TableCell>
                    <TableCell className="cell" key={2} />
                  </TableRow>
                ) : (
                  rows.map((row, rowIdx) => {
                    return pageMin <= rowIdx && rowIdx <= pageMax ? (
                      <TableRow key={rowIdx}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            <Markdown source={cell.value} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ) : null;
                  })
                )}
              </TableBody>
            </Table>
            <Pagination {...pagination} onChange={onPaginationChange} />
          </TableContainer>
        )}
      />
    </Styled>
  );

  if (!wrap) return content;
  return (
    <Modal
      iconDescription="Close"
      modalAriaLabel={modalAriaLabel}
      modalHeading={modalHeading}
      modalLabel={modalLabel}
      onBlur={onClose}
      onRequestClose={onClose}
      hasScrollingContent={true}
      open
      hasForm
      passiveModal={true}
      size="lg">
      {content}
    </Modal>
  );
};

Auditlog.defaultProps = {
  namespace: "auditlog",
  modalLabel: "Audit",
  modalAriaLabel: "Audit",
  modalHeading: "Audit",
  headers: DATA_TABLE_DEFAULTS.headers,
  zebra: true,
  message: "No audit logs.",
  wrap: true,
  onLoad: () => {},
  onClose: () => {},
};

Auditlog.propTypes = {
  headers: PropTypes.array,
  namespace: PropTypes.string,
  message: PropTypes.string,
  modalLabel: PropTypes.string,
  modalAriaLabel: PropTypes.string,
  modalHeading: PropTypes.string,
  onLoad: PropTypes.func,
  onClose: PropTypes.func,
  zebra: PropTypes.bool,
  wrap: PropTypes.bool,
};

export default Auditlog;
