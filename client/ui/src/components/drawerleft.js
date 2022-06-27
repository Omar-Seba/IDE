import * as React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";

export default function FileSystemNavigator({collection}) {
    const renderTree = (nodes) => (
        <TreeItem nodeId={nodes.key} label={nodes.name}>
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
            {collection.map(nodes => renderTree(nodes))}
        </TreeView>
    )
}