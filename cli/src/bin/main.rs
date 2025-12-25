use trezoaanchor_cli::Opts;
use anyhow::Result;
use clap::Parser;

fn main() -> Result<()> {
    trezoaanchor_cli::entry(Opts::parse())
}
