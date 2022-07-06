import * as React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";

export default function FileSystemNavigator({collection}) {
    console.log("je suis ici")
    const renderTree = (nodes) => (
        <TreeItem nodeId={nodes.path} label={nodes.name + nodes.extension}>
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