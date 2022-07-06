import * as React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";

export default function FileSystemNavigator({collection}) {
    const renderLabel = item => (
        <span
            onClick={event => {
                if (item.directory === false)
                    console.log(item.path);
                //setActiveItemId(item.id);
                // if you want after click do expand/collapse comment this two line
                event.stopPropagation();
                event.preventDefault();
            }}
        >
      {item.name + item.extension}
    </span>
    );
    const renderTree = (nodes) => (
        <TreeItem nodeId={nodes.path} label={renderLabel(nodes)}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{ height: window.innerHeight, maxWidth: 240, overflowY: 'auto' }}
        >
            {renderTree(collection)}
        </TreeView>
    )
}